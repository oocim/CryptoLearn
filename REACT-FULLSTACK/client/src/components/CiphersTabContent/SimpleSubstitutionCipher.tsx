import { TabsContent } from '../ui/tabs';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { Fingerprint } from 'lucide-react';

const SimpleSubstitutionCipherTab = () => {
  return (
    <TabsContent value="simple-substitution-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Fingerprint className="mr-2 text-blue-600" />
            Simple Substitution Cipher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Simple Substitution cipher replaces each letter with another letter consistently throughout the message. This is a placeholder component and will be implemented in detail later.</p>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SimpleSubstitutionCipherTab;