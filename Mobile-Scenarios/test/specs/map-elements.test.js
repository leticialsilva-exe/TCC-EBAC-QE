const { expect } = require('@wdio/globals')

describe('Map App Elements', () => {
    it('should log all accessible elements', async () => {
        // Wait for app to load
        await browser.pause(5000)

        // Get all elements with accessibility IDs
        const elements = await $$('*')

        console.log('=== Accessible Elements ===')
        for (let i = 0; i < elements.length; i++) {
            try {
                const tagName = await elements[i].getTagName()
                const text = await elements[i].getText()
                const accessibilityId = await elements[i].getAttribute('name') // iOS accessibility ID
                const className = await elements[i].getAttribute('className')

                if (accessibilityId || text) {
                    console.log(`Element ${i}: Tag: ${tagName}, Text: "${text}", Accessibility ID: "${accessibilityId}", Class: ${className}`)
                }
            } catch (e) {
                // Skip elements that can't be inspected
            }
        }

        console.log('=== End of Elements ===')
        expect(true).toBe(true) // Dummy assertion
    })
})