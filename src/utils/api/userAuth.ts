import BASE_URL from './BaseUrl';
import Cookies from 'js-cookie';

export async function loginApi(username: string, password: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}/dj-rest-auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();

    console.log('Login successful');
    console.log('login data', data);
    return data.key; // Return the token
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

export async function signupApi(firstName: string, lastName: string, username: string, email: string, password: string): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, username, email, password }),
      });
  
      if (!response.ok) {
        throw new Error('Signup failed');
      }
  
      const data = await response.json();
  
      console.log('Signup successful');
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }


  export async function logoutApi(): Promise<any> {
    try {
      const response = await fetch(`${BASE_URL}/users/logout/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${Cookies.get('token')}`, // Assuming the token is stored in local storage
        },
      });
  
      if (!response.ok) {
        throw new Error('Logout failed');
      }
  
      console.log('Logout successful');
      localStorage.removeItem('token'); // Remove the token from local storage
      return response.status;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }  
  