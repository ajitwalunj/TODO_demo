export const storedList = (key) => { return JSON.parse(localStorage.getItem(key)) };
export const saveToStorage = (key, data) => { localStorage.setItem(key, JSON.stringify(data)) };
export const clearStorage = () => {
	localStorage.clear();
	return true;
}
