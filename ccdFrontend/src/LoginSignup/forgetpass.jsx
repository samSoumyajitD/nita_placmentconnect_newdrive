import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom';
import { requestPasswordReset } from '../api/api';

export default function Forgetpassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await requestPasswordReset({ email });
      setMessage(response.data);
      alert('Reset Link Send');
    } catch (error) {
      setMessage('Error sending password reset email. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Enter your email address and we'll send you a link to reset your password.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
        {message && <p>{message}</p>}
      </CardContent>
      <CardFooter className="text-center text-muted-foreground">
        <Link to='/' className="underline underline-offset-2">
          Back to Login
        </Link>
      </CardFooter>
    </Card>
  )
}
