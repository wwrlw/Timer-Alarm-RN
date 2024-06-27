describe('Alarm App', () => {
    beforeAll(async () => {
        await device.launchApp();
    });

    it('should add and display a new alarm', async () => {
        await element(by.id('add-alarm-button')).tap();
        await element(by.type('android.widget.TimePicker')).setDatePickerDate('2024-06-27T14:00:00Z');
        await element(by.id('save-alarm-button')).tap();
        await expect(element(by.text('14:00'))).toBeVisible();
    });
});