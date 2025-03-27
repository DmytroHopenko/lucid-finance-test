"use server";

interface fetchDataResponse {
    json?: Variable[];
    error?: string;
}

export const fetchData = async (): Promise<fetchDataResponse> => {
    const api = "https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete"
    try{
        const response = await fetch(api);

        if(!response.ok) throw new Error(`Response status: ${response.status}`);

        const json: Variable[] = await response.json();
        
        return { json };
    }catch(error){
        return {
            error: error instanceof Error ? error.message : "Something went wrong"
        }
    }
}

interface autocompleteDataResponse {
    suggestions?: Variable[];
    error?: string;
}

export const autocompleteData = async (formula: string): Promise<autocompleteDataResponse> => {
    const api = `https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete?name=${formula}`
    try{
        const response = await fetch(api);

        if(!response.ok) throw new Error(`Response status: ${response.status}`);

        const suggestions: Variable[] = await response.json();
        
        return { suggestions };
    }catch(error){
        return {
            error: error instanceof Error ? error.message : "Something went wrong"
        }
    }
}