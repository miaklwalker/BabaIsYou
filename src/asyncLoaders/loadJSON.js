export default function loadJSON(url,requestFunction = fetch) {
    return requestFunction(url).then(response => response.json());
}