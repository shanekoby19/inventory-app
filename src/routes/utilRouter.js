
/**
 * A function that takes in a string and returns a loader function for that resource.
 * @param {string} resource - The pluar database resource. (i.e warehouses)
 * @returns A loader function for react-router-dom
 */
export const getAll = (resource) => {
    return async() => {
        const response = await fetch(`http://localhost:8000/${resource.toLowerCase()}`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();

        // If there is an error, return it.
        if(data.message) {
            throw new Error(data.message);
        }

        return data[resource];
    }
}

/**
 * A function that takes in a string and returns a loader function to get that resource by it's id..
 * @param {string} resource - The pluar database resource. (i.e warehouses)
 * @returns A loader function for react-router-dom
 */
export const getById = (resource) => {
    // Get the singler resource name for retreiving the object from the database.
    const resourceSingular = resource.slice(-3) === 'ves' ? `${resource.slice(0, -3)}f` : resource.slice(0, -1);

    return async({ params }) => {
        const response = await fetch(`http://localhost:8000/${resource}/${params.id}`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        if(data.message) {
            throw new Error(data.message);
        }
        return data[resourceSingular];
    }
}

/**
 * A function that returns an action function update, and delete items in the database.
 * @param {string} resource The pluar database resource. (i.e warehouses)
 * @returns A loader function for react-router-dom
 */
export const idActions = (resource) => {
    const singularResource = resource.slice(-3) === 'ves' ? `${resource.slice(0, -3)}f` : resource.slice(0, -1)

    return async({ params, request }) => {
        const id = params.id;
        const data = await request.formData();
        const intent = data.get('intent');

        console.log(singularResource);
        console.log(id);
    
        // Add all the properties needed to submit a record to the database.
        const submission = {
            name: data.get('name'),
            quantity: data.get('quantity')
        }
    
        if(intent === 'update') {
            const response = await fetch(`http://localhost:8000/${resource}/${id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submission)
            });
            const data = await response.json();
            
            if(data.message) {
                return data.message;
            }

            console.log(data);
            console.log(singularResource);
            console.log(data[singularResource])
    
            return data[singularResource];
            
        } else if(intent === 'delete') {
            const response = await fetch(`http://localhost:8000/${resource}/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const { message } = await response.json();
            
            if(message) {
                return message;
            }
    
            return 'Item deleted successfully.';
        }
    
        return submission
    }
}