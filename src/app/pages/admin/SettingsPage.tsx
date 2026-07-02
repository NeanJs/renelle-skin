import { useState, useEffect } from 'react';
import { AdminHeader } from '@/app/components/admin/AdminHeader';
import { Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { getBrandConfig, setBrandConfig, BrandConfig } from '@/app/config/brand';
import { toast } from 'sonner';
import { Save, Upload } from 'lucide-react';

export function SettingsPage() {
  const [config, setConfig] = useState<BrandConfig>(getBrandConfig());
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setBrandConfig(config);
      setIsSaving(false);
      toast.success('Settings saved successfully');
      
      // Trigger a page reload to apply brand changes
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }, 1000);
  };

  const handleReset = () => {
    setConfig(getBrandConfig());
    toast.info('Changes discarded');
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader title="Settings" searchPlaceholder="Search settings..." />

      <div className="p-6">
        <Tabs defaultValue="brand" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="brand">Brand</TabsTrigger>
            <TabsTrigger value="commerce">Commerce</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList>

          {/* Brand Settings */}
          <TabsContent value="brand" className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Brand Settings</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Customize your brand identity and appearance
                </p>
              </div>

              <div className="space-y-6">
                {/* Brand Name */}
                <div className="space-y-2">
                  <Label htmlFor="brandName">Brand Name</Label>
                  <Input
                    id="brandName"
                    value={config.brandName}
                    onChange={(e) => setConfig({ ...config, brandName: e.target.value })}
                    placeholder="Enter brand name"
                  />
                  <p className="text-xs text-muted-foreground">
                    This name will appear throughout the application
                  </p>
                </div>

                {/* Logo Upload */}
                <div className="space-y-2">
                  <Label htmlFor="logo">Brand Logo</Label>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Logo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended: SVG or PNG, max 2MB
                    </p>
                  </div>
                </div>

                {/* Primary Color */}
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Primary Color</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="primaryColor"
                      type="color"
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={config.primaryColor}
                      onChange={(e) => setConfig({ ...config, primaryColor: e.target.value })}
                      className="flex-1"
                      placeholder="#2d2d2d"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used for buttons, links, and primary UI elements
                  </p>
                </div>

                {/* Accent Color */}
                <div className="space-y-2">
                  <Label htmlFor="accentColor">Accent Color</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="accentColor"
                      type="color"
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="w-20 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      value={config.accentColor}
                      onChange={(e) => setConfig({ ...config, accentColor: e.target.value })}
                      className="flex-1"
                      placeholder="#e7e5e4"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Used for backgrounds and secondary elements
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-border">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Discard Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Commerce Settings */}
          <TabsContent value="commerce" className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Commerce Settings</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure pricing, taxes, and shipping
                </p>
              </div>

              <div className="space-y-6">
                {/* Currency */}
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select value={config.currency} onValueChange={(value) => setConfig({ ...config, currency: value })}>
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    All prices will be displayed in this currency
                  </p>
                </div>

                {/* Tax Rate */}
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.01"
                    value={config.taxRate}
                    onChange={(e) => setConfig({ ...config, taxRate: parseFloat(e.target.value) || 0 })}
                    placeholder="13"
                  />
                  <p className="text-xs text-muted-foreground">
                    Applied to all orders (e.g., 13 for HST in Ontario)
                  </p>
                </div>

                {/* Shipping Fee */}
                <div className="space-y-2">
                  <Label htmlFor="shippingFee">Default Shipping Fee ($)</Label>
                  <Input
                    id="shippingFee"
                    type="number"
                    min="0"
                    step="0.01"
                    value={config.shippingFee}
                    onChange={(e) => setConfig({ ...config, shippingFee: parseFloat(e.target.value) || 0 })}
                    placeholder="0"
                  />
                  <p className="text-xs text-muted-foreground">
                    Set to 0 for free shipping
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-8 pt-6 border-t border-border">
                <Button onClick={handleSave} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button variant="outline" onClick={handleReset}>
                  Discard Changes
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integrations" className="space-y-6">
            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">POS Integration</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure Point of Sale system connection
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="posEndpoint">POS API Endpoint</Label>
                  <Input
                    id="posEndpoint"
                    type="url"
                    placeholder="https://api.yourpos.com/v1"
                    defaultValue="https://api.yourpos.com/v1"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="posApiKey">POS API Key</Label>
                  <Input
                    id="posApiKey"
                    type="password"
                    placeholder="Enter your POS API key"
                    defaultValue="sk_test_1234567890"
                  />
                  <p className="text-xs text-muted-foreground">
                    Keep this secure - it's used to sync inventory and orders
                  </p>
                </div>

                <Button variant="outline" size="sm">
                  Test Connection
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="mb-6">
                <h2 className="text-lg font-semibold">Payment Gateway</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Configure Stripe payment processing
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="stripePublicKey">Stripe Publishable Key</Label>
                  <Input
                    id="stripePublicKey"
                    placeholder="pk_test_..."
                    defaultValue="pk_test_51234567890"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
                  <Input
                    id="stripeSecretKey"
                    type="password"
                    placeholder="sk_test_..."
                    defaultValue="sk_test_51234567890"
                  />
                  <p className="text-xs text-muted-foreground">
                    Never share your secret key publicly
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    type="url"
                    readOnly
                    value="https://yourdomain.com/api/webhooks/stripe"
                    className="bg-secondary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Add this URL to your Stripe webhook settings
                  </p>
                </div>

                <Button variant="outline" size="sm">
                  Verify Configuration
                </Button>
              </div>
            </Card>

            <div className="flex gap-3">
              <Button onClick={() => toast.success('Integration settings saved')}>
                <Save className="w-4 h-4 mr-2" />
                Save Integration Settings
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
