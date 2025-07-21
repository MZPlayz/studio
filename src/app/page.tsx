
'use client';

import { Lock, Smartphone } from 'lucide-react';
import Link from 'next/link';
import MapComponent from '@/components/MapComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function LoginPage() {
  return (
        <div className="relative h-screen w-screen">
             <MapComponent />
             <div className="absolute inset-0 flex items-center justify-center p-4">
                <Card className="w-full max-w-sm bg-white/80 backdrop-blur-sm">
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Welcome to RideGo</CardTitle>
                        <CardDescription>Your trusted ridesharing partner</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Mobile Number</Label>
                            <div className="relative">
                                <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input id="phone" type="tel" placeholder="+8801XXXXXXXXX" className="pl-10" />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="pin">5-digit PIN</Label>
                             <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <Input id="pin" type="password" maxLength={5} placeholder="Enter your PIN" className="pl-10"/>
                            </div>
                        </div>
                        <div className="space-y-2 pt-2">
                             <Link href="/home" passHref>
                                <Button className="w-full h-12 text-lg">Log In</Button>
                             </Link>
                             <Link href="/register" passHref>
                                <Button variant="outline" className="w-full h-12 text-lg">Register</Button>
                             </Link>
                        </div>
                        <div className="text-center">
                            <Link href="/agent-home" className="text-sm font-medium text-primary hover:underline">
                                Log in as Agent
                            </Link>
                        </div>
                    </CardContent>
                </Card>
             </div>
        </div>
  );
}
