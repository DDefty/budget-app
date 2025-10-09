import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

interface ApiErrorResponse {
  error: string;
  issues?: Array<{
    path: string[];
    message: string;
  }>;
}


export const handleApiError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const apiError = error.response?.data as ApiErrorResponse;
    
    if (error.response?.status === 400 && apiError?.issues) {
      apiError.issues.forEach(issue => {
        toast.error(issue.message);
      });
      return;
    }
    
    if (apiError?.error) {
      switch (apiError.error) {
        case 'Invalid email or password':
          toast.error('Invalid email or password. Please check your credentials.');
          break;
        case 'Email already registered':
          toast.error('This email is already registered. Please use a different email or try logging in.');
          break;
        case "Passwords don't match":
          toast.error("Passwords don't match. Please make sure both passwords are identical.");
          break;
        case 'Invalid payload':
          toast.error('Please check all fields and try again.');
          break;
        case 'Unauthenticated':
          toast.error('Please log in to continue.');
          break;
        case 'Invalid token':
          toast.error('Your session has expired. Please log in again.');
          break;
        case 'User not found':
          toast.error('User account not found.');
          break;
        default:
          toast.error(apiError.error);
      }
      return;
    }
    
    switch (error.response?.status) {
      case 400:
        toast.error('Invalid request. Please check your input.');
        break;
      case 401:
        toast.error('Authentication failed. Please check your credentials.');
        break;
      case 403:
        toast.error('Access denied. You do not have permission for this action.');
        break;
      case 404:
        toast.error('Resource not found.');
        break;
      case 409:
        toast.error('Conflict detected. Please try again.');
        break;
      case 422:
        toast.error('Validation failed. Please check your input.');
        break;
      case 429:
        toast.error('Too many requests. Please wait a moment and try again.');
        break;
      case 500:
        toast.error('Server error. Please try again later.');
        break;
      case 502:
        toast.error('Service temporarily unavailable. Please try again later.');
        break;
      case 503:
        toast.error('Service unavailable. Please try again later.');
        break;
      default:
        toast.error('An unexpected error occurred. Please try again.');
    }
  } else if (error instanceof Error) {
    if (error.message.includes('Network Error')) {
      toast.error('Network error. Please check your internet connection.');
    } else if (error.message.includes('timeout')) {
      toast.error('Request timed out. Please try again.');
    } else {
      toast.error(error.message || 'An unexpected error occurred.');
    }
  } else {
    toast.error('An unexpected error occurred. Please try again.');
  }
};


export const showAuthSuccess = {
  login: () => toast.success('Welcome back! Successfully logged in.'),
  register: () => toast.success('Account created successfully! Welcome to Finance Tracker.'),
  logout: () => toast.success('Successfully logged out. See you next time!'),
};