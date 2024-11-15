import { TabsContent } from '../ui/tabs';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Grid } from 'lucide-react';

const VigenereCipherTab = () => {
  return (
    <TabsContent value="vigenere-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Grid className="mr-2 text-blue-600" />
            Vigenère Cipher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Vigenère cipher is a polyalphabetic substitution cipher. This is a placeholder component and will be implemented in detail later.</p>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default VigenereCipherTab;