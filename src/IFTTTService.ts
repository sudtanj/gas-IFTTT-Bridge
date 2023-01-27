import URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

interface IFTTTPayload {
 value1?: string
 value2?: string
 value3?: string
}

interface IFTTTParams extends URLFetchRequestOptions {
 payload: IFTTTPayload
 eventName: string
}

function getTriggerUrl(eventName: string) {
 const key: string | null = PropertiesService.getUserProperties().getProperty("IFTTT_KEY")
 if (key === null) {
  throw new Error("Invalid IFTTT_KEY on your user properties!")
 }
 return "https://maker.ifttt.com/trigger/" + eventName + "/with/key/" + key
}

function sendIFTTTEvent(params: IFTTTParams) {
 const url = getTriggerUrl(params.eventName)
 const fetchParams: URLFetchRequestOptions = {
  payload: params.payload,
  method: params.method
 }
 const result = UrlFetchApp.fetch(
  url, fetchParams
 );

 if (result.getResponseCode() !== 200) {
  throw new Error(JSON.stringify(result))
 }

 return result
}
