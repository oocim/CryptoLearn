import { TabsContent } from '../ui/tabs';
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card';
import { History } from 'lucide-react';

const RailFenceCipherTab = () => {
  return (
    <TabsContent value="rail-fence-cipher" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <History className="mr-2 text-blue-600" />
            Rail Fence Cipher
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>The Rail Fence cipher is a transposition cipher that arranges the plaintext in a zigzag pattern. This is a placeholder component and will be implemented in detail later.</p>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default RailFenceCipherTab;