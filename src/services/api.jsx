const BASE_URL = "https://reqres.in/api"

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(errorData.error || "Something went wrong")
  }

  return response.json()
}

// Authentication
export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  return handleResponse(response)
}

// Users
export const getUsers = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/users?page=${page}`)
  return handleResponse(response)
}

export const getUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`)
  return handleResponse(response)
}

export const updateUser = async (id, userData) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })

  return handleResponse(response)
}

export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
  })

  // For DELETE requests, Reqres API returns an empty response with status 204
  if (response.status === 204) {
    return true
  }

  return handleResponse(response)
}

