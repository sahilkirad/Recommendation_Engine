// File: packages/platform-frontend/src/app/rules/page.tsx
'use client'; // This page is interactive, so it's a client component

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogOverlay
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle } from 'lucide-react';

// NOTE: This is placeholder data. We will fetch this from our API later.
const sampleRules = [
  { id: 'rule-1', name: 'Boost Jackets', condition: 'category IS jackets', action: 'Boost by 30%', status: 'Active' },
  { id: 'rule-2', name: 'Promote New Arrivals', condition: 'tag IS new', action: 'Boost by 50%', status: 'Active' },
  { id: 'rule-3', name: 'Deprioritize Sale Items', condition: 'tag IS sale', action: 'Demote by 20%', status: 'Inactive' },
];

export default function RulesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Business Rules</h1>
          <p className="text-muted-foreground">Coach your agent to meet your strategic goals.</p>
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Rule
            </Button>
          </DialogTrigger>
          <DialogOverlay className="fixed inset-0 bg-black/40" />
              <DialogContent className="sm:max-w-[425px] bg-white text-black border-slate-200">
            <DialogHeader>
              <DialogTitle>Create Rule</DialogTitle>
              <DialogDescription>
                Define a new rule to influence the recommendation engine.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Rule Name</Label>
                <Input id="name" placeholder="e.g., Boost New T-Shirts" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Condition</Label>
                <div className="col-span-3 grid grid-cols-3 gap-2">
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Field" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category">Category</SelectItem>
                      <SelectItem value="tag">Tag</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger><SelectValue placeholder="Operator" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="is">Is</SelectItem>
                      <SelectItem value="is_not">Is Not</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Value" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right">Action</Label>
                <div className="col-span-3 grid grid-cols-2 gap-2">
                   <Select>
                    <SelectTrigger><SelectValue placeholder="Action Type" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="boost">Boost by</SelectItem>
                      <SelectItem value="demote">Demote by</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input placeholder="Value (e.g., 30%)" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsModalOpen(false)}>Save Rule</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
          {sampleRules.map((rule) => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium">{rule.name}</TableCell>
              <TableCell>{rule.condition}</TableCell>
              <TableCell>{rule.action}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  rule.status === 'Active' ? 'bg-green-500/20 text-green-700' : 'bg-gray-500/20 text-gray-700'
                }`}>
                  {rule.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
}