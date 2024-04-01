const FORM_ID = ''
const ITEM_ID = ''

/* eslint-disable-next-line no-unused-vars */
function updateMembroToForm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName('membros')
  const dataRange = sheet.getDataRange()
  const values = dataRange.getValues()
  const form = FormApp.openById(FORM_ID)
  let participanteItem = form.getItemById(ITEM_ID).asListItem()

  let choices = []
  for (let i = 1; i < values.length; i++) {
    const r = values[i]
    if (r[0] === '' || r[1] === '') continue
    choices.push(r[0] + ' (Team ' + r[1] + ')')
  }
  choices.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))

  participanteItem.setChoiceValues(choices)
}
