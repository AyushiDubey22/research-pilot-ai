const API_URL=import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function CheckAPIHealth(){
    const response = await fetch(`${API_URL}/health`);

    if(!response.ok){
        throw new Error(`API has returned an error:${response.statusText}`);
    }

    return response.json();
}