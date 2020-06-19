export const fetchVocabs = async () => {
    const response = await fetch("http://localhost:8080/api/send")
    return await response.json();
}