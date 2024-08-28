import { Request, Response } from "express"

const createUserApi = process.env.createUserReroute || `http://localhost:${process.env.PORT}/v1/api/users/newUser`;
export const RerouteRequestController = async (req: Request, res: Response) => {
  const { data } = req.body;

  try {
    if (!data) {
      throw new Error('no user data provided' + data)
    }

    const userData = {
      email: data.email, firstName: data.given_name, lastName: data.family_name, pictureUrl: data.picture
    }

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userData })
    };

    const response = await fetch(createUserApi, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const user = await response.json();

    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({
      success: false,
      error: 'Error creating user'
    });
  }
};