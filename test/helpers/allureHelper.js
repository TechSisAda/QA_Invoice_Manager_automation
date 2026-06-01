import AllureReporter from '@wdio/allure-reporter'

export const addFeature  = (name)  => AllureReporter.addFeature(name)
export const addSeverity = (level) => AllureReporter.addSeverity(level)
export const addStory    = (name)  => AllureReporter.addStory(name)
export const addStep     = (name, status = 'passed') => AllureReporter.addStep(name, {}, status)
export const addLabel    = (name, value) => AllureReporter.addLabel(name, value)
