// Replace with YOUR computer's IP address from ipconfig
const BASE_URL = 'http://192.168.100.4:8081/api';

// Fetch all tourist sites
export const getAllSites = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sites`);
    if (!response.ok) {
      throw new Error('Failed to fetch sites');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sites:', error);
    throw error;
  }
};

// Fetch one site by ID
export const getSiteById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/sites/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch site');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching site:', error);
    throw error;
  }
};

// Fetch sites by category
export const getSitesByCategory = async (category) => {
  try {
    const response = await fetch(
      `${BASE_URL}/sites/category/${category}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch sites');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching sites:', error);
    throw error;
  }
};