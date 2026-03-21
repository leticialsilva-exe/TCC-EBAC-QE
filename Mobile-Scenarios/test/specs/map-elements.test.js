import { expect, driver } from '@wdio/globals'
import { writeFile } from 'node:fs/promises'
import path from 'node:path'

export async function exportMapResultsToFile(results, fileName = 'ios-map-elements.json') {
    const outputPath = path.join(process.cwd(), fileName)
    const payload = {
        generatedAt: new Date().toISOString(),
        platform: 'iOS',
        total: results.length,
        elements: results
    }

    await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf-8')
    return outputPath
}

describe('Map App Elements (iOS)', () => {
    it.skip('should log visible iOS elements and accessibility ids', async () => {
        expect(driver.isIOS).toBeTruthy()

        await browser.pause(5000)

        const iosTypes = [
            'XCUIElementTypeButton',
            'XCUIElementTypeStaticText',
            'XCUIElementTypeTextField',
            'XCUIElementTypeSecureTextField',
            'XCUIElementTypeImage',
            'XCUIElementTypeCell',
            'XCUIElementTypeLink'
        ]

        const mapped = []

        for (const type of iosTypes) {
            const elements = await $$(`//${type}`)

            for (const element of elements) {
                try {
                    const label = await element.getAttribute('label')
                    const name = await element.getAttribute('name')
                    const value = await element.getAttribute('value')
                    const text = await element.getText()

                    if (label || name || value || text) {
                        mapped.push({ type, label, name, value, text })
                    }
                } catch {
                    // ignore stale/non-readable elements
                }
            }
        }

        const unique = Array.from(
            new Map(mapped.map((item) => [`${item.type}|${item.name}|${item.label}|${item.value}|${item.text}`, item])).values()
        )

        console.log('=== iOS mapped elements ===')
        unique.forEach((item, index) => {
            console.log(
                `${index + 1}. type=${item.type} | name="${item.name || ''}" | label="${item.label || ''}" | value="${item.value || ''}" | text="${item.text || ''}"`
            )
        })
        console.log('=== End of iOS mapped elements ===')

        const exportedFile = await exportMapResultsToFile(unique)
        console.log(`Results exported to: ${exportedFile}`)

        expect(unique.length).toBeGreaterThan(0)
    })
})