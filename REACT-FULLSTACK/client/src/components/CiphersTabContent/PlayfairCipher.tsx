import { TabsContent } from '../ui/tabs';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Shuffle } from 'lucide-react';

const PlayfairCipherTab = () => {
  return (
    <TabsContent value="playfair-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shuffle className="mr-2 text-blue-600" />
            Playfair Cipher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Playfair cipher is a digraph substitution cipher. This is a placeholder component and will be implemented in detail later.</p>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default PlayfairCipherTab;