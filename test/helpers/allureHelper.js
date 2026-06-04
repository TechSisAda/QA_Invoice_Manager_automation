/**
 * @wdio/allure-reporter v9 exposes static methods via the default export class.
 * Wrap them here so specs stay clean and we have one place to fix imports if the API changes.
 */
import AllureReporter from '@wdio/allure-reporter'

export const addFeature  = (name)  => AllureReporter.addFeature(name)
export const addSeverity = (level) => AllureReporter.addSeverity(level)
export const addStory    = (name)  => AllureReporter.addStory(name)
export const addLabel    = (name, value) => AllureReporter.addLabel(name, value)
export const addStep     = (name, status = 'passed') => AllureReporter.addStep(name, {}, status)
