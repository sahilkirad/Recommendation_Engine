'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PlusCircle, Loader2 } from 'lucide-react';
import { getRules, createRule } from '@/lib/api'; // Import our new API functions
import withAuth from '@/components/auth/withAuth'; // Import our auth HOC

function RulesPage() {
  const [rules, setRules] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for the new rule form
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleField, setNewRuleField] = useState('');
  const [newRuleValue, setNewRuleValue] = useState('');
  const [newRuleAction, setNewRuleAction] = useState('');
  const [newRuleActionValue, setNewRuleActionValue] = useState(0);

  const fetchRules = async () => {
    try {
      const fetchedRules = await getRules();
      setRules(fetchedRules);
    } catch (error) {
      console.error("Failed to fetch rules:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRules();
  }, []);

  const handleCreateRule = async () => {
    const ruleData = {
      name: newRuleName,
      condition_field: newRuleField,
      condition_value: newRuleValue,
      action_type: newRuleAction,
      action_value: Number(newRuleActionValue),
    };
    try {
      await createRule(ruleData);
      setIsModalOpen(false); // Close the modal
      fetchRules(); // Refresh the list of rules
    } catch (error) {
      console.error("Failed to create rule:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Rules</h1>
          <p className="text-muted-foreground">Coach your agent to meet your strategic goals.</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Create New Rule</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-white text-black border-slate-200">
            <DialogHeader>
              <DialogTitle>Create Rule</DialogTitle>
              <DialogDescription>Define a new rule to influence the recommendation engine.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Rule Name</Label>
                <Input id="name" placeholder="e.g., Boost New T-Shirts" className="col-span-3" onChange={e => setNewRuleName(e.target.value)} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Condition</Label>
                <div className="col-span-3 grid grid-cols-2 gap-2">
                  <Select onValueChange={setNewRuleField}>
                    <SelectTrigger><SelectValue placeholder="Field" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="tag">Tag</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Value (e.g., Jackets)" onChange={e => setNewRuleValue(e.target.value)} />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Action</Label>
                <div className="col-span-3 grid grid-cols-2 gap-2">
                   <Select onValueChange={setNewRuleAction}>
                    <SelectTrigger><SelectValue placeholder="Action Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boost">Boost by</SelectItem>
                      <SelectItem value="demote">Demote by</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Value (e.g., 30)" type="number" onChange={e => setNewRuleActionValue(Number(e.target.value))} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateRule}>Save Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-40"><Loader2 className="h-8 w-8 animate-spin" /></div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Rule Name</TableHead>
              <TableHead>Condition</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map((rule) => (
              <TableRow key={rule.id}>
                <TableCell className="font-medium">{rule.name}</TableCell>
                <TableCell>{`${rule.condition_field} IS ${rule.condition_value}`}</TableCell>
                <TableCell>{`${rule.action_type} by ${rule.action_value}%`}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${rule.is_active ? 'bg-green-500/20 text-green-700' : 'bg-gray-500/20 text-gray-700'}`}>
                    {rule.is_active ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </DashboardLayout>
  );
}

export default withAuth(RulesPage);