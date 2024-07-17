import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { resetPassword } from '../api/api';
import {Link} from "react-router-dom"
export default function ResetPassword() {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await resetPassword(token, { newPassword });
      setMessage(response.data);

    } catch (error) {
      setMessage('Error resetting password. Please try again.');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="new-password">New Password</Label>
            <Input 
              id="new-password" 
              type="password" 
              placeholder="Enter your new password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            Reset Password
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
