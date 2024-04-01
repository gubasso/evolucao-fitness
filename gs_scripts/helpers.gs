/* eslint-disable-next-line no-unused-vars */
function logItemIDs() {
  var form = FormApp.getActiveForm()
  var items = form.getItems()
  for (var i = 0; i < items.length; i++) {
    Logger.log(items[i].getTitle() + ': ' + items[i].getId() + '-' + items[i].getType())
  }
}

/* eslint-disable-next-line no-unused-vars */
function updateFormFromExternalSpreadsheet() {
  var externalSsId = '1FsMqZwVw4qR8fEFK-oOzwmF_wrXyFfW1AFOxqI1xEZ8' // Replace with the ID of the external spreadsheet
  var externalSheetName = 'participantes' // Replace with the name of the sheet containing the suspension list
  var formId = '1FJOoXHYwmt7kORapzsIu2wbGdWjRw1HeubdWBzKf4UA' // Replace with your Google Form ID
  var itemId = '268351293' // Replace with the actual ID of the form item you want to update

  // Open the external spreadsheet and sheet
  var externalSs = SpreadsheetApp.openById(externalSsId)
  var externalSheet = externalSs.getSheetByName(externalSheetName)
  var dataRange = externalSheet.getDataRange()
  var values = dataRange.getValues()

  // Open the form and the specific item to update
  var form = FormApp.openById(formId)
  var item = form.getItemById(itemId).asListItem()

  let choices = []
  for (let i = 1; i < values.length; i++) {
    const r = values[i]
    if (r[0] === '' || r[1] === '') continue
    choices.push(r[0] + ' (Team ' + r[1] + ')')
  }
  choices.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))

  // Update the form item with new choices
  item.setChoiceValues(choices)
}
