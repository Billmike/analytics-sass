/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const automationFormSchema = z.object({
  name: z.string().min(1, "Automation name is required"),
  type: z.string().min(1, "Automation type is required"),
  triggers: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Number of triggers must be greater than 0"
  ),
  actions: z.string().refine(
    (val) => !isNaN(Number(val)) && Number(val) > 0,
    "Number of actions must be greater than 0"
  ),
});

interface NewAutomationModalProps {
  onCreateAutomation: (automation: any) => void;
}

export const NewAutomation = ({ onCreateAutomation }: NewAutomationModalProps) => {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof automationFormSchema>>({
    resolver: zodResolver(automationFormSchema),
    defaultValues: {
      name: "",
      type: "",
      triggers: "",
      actions: "",
    },
  });

  const onSubmit = (values: z.infer<typeof automationFormSchema>) => {
    const newAutomation = {
      id: `AUT${String(Math.floor(Math.random() * 100000)).padStart(5, '0')}`,
      name: values.name,
      type: values.type,
      status: 'Active',
      triggers: Number(values.triggers),
      actions: Number(values.actions),
      executions: 0,
      successRate: 100,
      lastRun: null,
      created: new Date()
    };

    onCreateAutomation(newAutomation);
    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>New Automation</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Automation</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Automation Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter automation name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Automation Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select automation type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="Notification">Notification</SelectItem>
                      <SelectItem value="Task">Task</SelectItem>
                      <SelectItem value="Workflow">Workflow</SelectItem>
                      <SelectItem value="Integration">Integration</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="triggers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Triggers</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="Enter number of triggers" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="actions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Actions</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" placeholder="Enter number of actions" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Automation</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};