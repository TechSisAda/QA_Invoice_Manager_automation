import 'dotenv/config'
import Anthropic from '@anthropic-ai/sdk'
import { execSync } from 'child_process'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import path from 'path'

const client = new Anthropic()

const tools = [
    {
        name: 'run_tests',
        description: 'Run a WebdriverIO test suite and return the console output.',
        input_schema: {
            type: 'object',
            properties: {
                suite: {
                    type: 'string',
                    enum: ['smoke', 'regression', 'e2e', 'all'],
                    description: 'The suite to run.'
                }
            },
            required: ['suite']
        }
    },
    {
        name: 'read_allure_results',
        description: 'Parse the latest Allure result JSON files and return a summary of failures.',
        input_schema: { type: 'object', properties: {}, required: [] }
    },
    {
        name: 'read_spec_file',
        description: 'Read the source code of a test spec or page object file.',
        input_schema: {
            type: 'object',
            properties: {
                file_path: { type: 'string', description: 'Path relative to project root.' }
            },
            required: ['file_path']
        }
    },
    {
        name: 'write_spec_file',
        description: 'Overwrite a test spec or page object file with corrected content.',
        input_schema: {
            type: 'object',
            properties: {
                file_path: { type: 'string' },
                content:   { type: 'string', description: 'Full updated file content.' }
            },
            required: ['file_path', 'content']
        }
    }
]

function executeTool(name, input) {
    if (name === 'run_tests') {
        try {
            return execSync(`npm run test:${input.suite} 2>&1`, {
                timeout: 300_000,
                encoding: 'utf8'
            })
        } catch (e) {
            return e.stdout || e.message
        }
    }

    if (name === 'read_allure_results') {
        const dir = './allure-results'
        let files
        try {
            files = readdirSync(dir).filter(f => f.endsWith('-result.json'))
        } catch {
            return 'No allure-results directory found. Run tests first.'
        }
        const results = files.slice(-100).map(f => {
            const data = JSON.parse(readFileSync(path.join(dir, f), 'utf8'))
            return {
                name:    data.name,
                status:  data.status,
                message: data.statusDetails?.message?.slice(0, 400) ?? null,
                suite:   data.labels?.find(l => l.name === 'suite')?.value ?? 'unknown'
            }
        })
        const failed = results.filter(r => r.status === 'failed')
        return JSON.stringify({
            total: results.length,
            passed: results.filter(r => r.status === 'passed').length,
            failed: failed.length,
            broken: results.filter(r => r.status === 'broken').length,
            failures: failed
        }, null, 2)
    }

    if (name === 'read_spec_file') {
        try {
            return readFileSync(input.file_path, 'utf8')
        } catch (e) {
            return `Error reading file: ${e.message}`
        }
    }

    if (name === 'write_spec_file') {
        writeFileSync(input.file_path, input.content, 'utf8')
        return `Successfully updated: ${input.file_path}`
    }

    return `Unknown tool: ${name}`
}

async function runTestAgent(userPrompt) {
    const messages = [{ role: 'user', content: userPrompt }]

    console.log('\n┌─────────────────────────────────────────────────────────┐')
    console.log('│       InvoiceManager AI Test Agent — claude-sonnet-4-6  │')
    console.log('└─────────────────────────────────────────────────────────┘\n')

    while (true) {
        const response = await client.messages.create({
            model: 'claude-sonnet-4-6',
            max_tokens: 8096,
            tools,
            messages,
            system: `You are a test automation agent for InvoiceManager, a Nigerian FIRS-compliant e-invoicing platform.
You have tools to run WebdriverIO test suites, read Allure results, and read/write spec files.

When asked to run and analyse tests:
1. Run the requested suite with run_tests.
2. Use read_allure_results to identify failures.
3. For each failure, read the relevant spec file with read_spec_file.
4. Diagnose the root cause:
   - If it is a test code issue (wrong selector, stale data, timing), fix it with write_spec_file.
   - If it looks like an application bug, note it clearly for the team.
5. Re-run the suite after applying fixes to confirm they pass.
6. End with a structured report: total/passed/failed, fixes applied, suspected app bugs.

Always be specific about file paths and test IDs (e.g. REG-INV-004, SM-002).`
        })

        messages.push({ role: 'assistant', content: response.content })

        if (response.stop_reason === 'end_turn') {
            const text = response.content.find(b => b.type === 'text')?.text
            console.log('\n── Final Report ───────────────────────────────────────────')
            console.log(text)
            break
        }

        const toolUses = response.content.filter(b => b.type === 'tool_use')
        if (!toolUses.length) break

        const toolResults = toolUses.map(tu => {
            console.log(`  [tool] ${tu.name}(${JSON.stringify(tu.input)})`)
            const result = executeTool(tu.name, tu.input)
            return {
                type: 'tool_result',
                tool_use_id: tu.id,
                content: typeof result === 'string' ? result : JSON.stringify(result)
            }
        })

        messages.push({ role: 'user', content: toolResults })
    }
}

const prompt = process.argv.slice(2).join(' ') ||
    'Run the smoke tests, read the results, diagnose any failures, apply fixes if they are test-code issues, and give me a full report.'

runTestAgent(prompt).catch(console.error)
