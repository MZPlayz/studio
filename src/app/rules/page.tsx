
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white p-4">
        <Link href="/menu">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-6 w-6" />
          </Button>
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold text-gray-800">রুলস ও নির্দেশনা</h1>
        <div className="w-10" />
      </header>

      <main className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>Rules & Instructions</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none text-gray-700">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
            </p>
            <p>
              Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor.
            </p>
            <h3 className="font-bold mt-4">User Conduct</h3>
            <p>
              Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam.
            </p>
            <h3 className="font-bold mt-4">Payments and Fares</h3>
            <p>
              Fusce pellentesque suscipit nibh. Integer vitae libero ac risus egestas placerat. Vestibulum commodo felis quis tortor. Ut aliquam sollicitudin leo. Cras iaculis ultricies nulla. Sed quis lacus. Mauris justo.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
