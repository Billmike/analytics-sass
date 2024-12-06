import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  MoreVertical,
  UserPlus,
  Mail,
  Shield,
  UserX,
  Settings,
  RefreshCw,
  Check,
  Clock
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'invited' | 'disabled';
  lastActive?: Date;
  permissions: string[];
}

interface TeamManagementProps {
  team: TeamMember[];
  onUpdate: (team: TeamMember[]) => void;
}

const ROLES = ['Admin', 'Manager', 'Analyst', 'Viewer'];
// const PERMISSIONS = ['view', 'edit', 'delete', 'manage_users', 'manage_billing'];

export const TeamManagement = ({ team, onUpdate }: TeamManagementProps) => {
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    role: 'Viewer',
    permissions: ['view']
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInvite = async () => {
    setIsProcessing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newMember: TeamMember = {
        id: `usr-${Math.random().toString(36).substr(2, 9)}`,
        name: inviteForm.email.split('@')[0],
        email: inviteForm.email,
        role: inviteForm.role,
        status: 'invited',
        permissions: inviteForm.permissions
      };

      onUpdate([...team, newMember]);
      
      toast({
        title: "Invitation sent",
        description: `An invitation has been sent to ${inviteForm.email}`,
      });
      
      setShowInviteDialog(false);
      setInviteForm({ email: '', role: 'Viewer', permissions: ['view'] });
    } catch {
      toast({
        title: "Error",
        description: "Failed to send invitation. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStatusChange = async (memberId: string, newStatus: 'active' | 'disabled') => {
    try {
      const updatedTeam = team.map(member => 
        member.id === memberId ? { ...member, status: newStatus } : member
      );
      onUpdate(updatedTeam);
      
      toast({
        title: "Status updated",
        description: `Team member status has been updated to ${newStatus}`,
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to update status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Check className="w-4 h-4 text-green-500" />;
      case 'invited':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'disabled':
        return <UserX className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-white dark:bg-gray-900">
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold dark:text-white">Team Management</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your team members and their access levels
            </p>
          </div>
          <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="w-4 h-4 mr-2" />
                Invite Member
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Team Member</DialogTitle>
                <DialogDescription>
                  Send an invitation to join your team
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={inviteForm.role}
                    onValueChange={(value) => setInviteForm(prev => ({ ...prev, role: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROLES.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleInvite} disabled={isProcessing}>
                  {isProcessing ? 'Sending...' : 'Send Invitation'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Team Members List */}
        <div className="space-y-4">
          {team.map((member) => (
            <div
              key={member.id}
              className="p-4 border rounded-lg dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                      {member.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium dark:text-white">{member.name}</h3>
                      <Badge variant={
                        member.status === 'active' ? 'default' :
                        member.status === 'invited' ? 'secondary' :
                        'destructive'
                      }>
                        {getStatusIcon(member.status)}
                        <span className="ml-1">{member.status}</span>
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      {member.email}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant="outline">
                    <Shield className="w-3 h-3 mr-1" />
                    {member.role}
                  </Badge>
                  {member.lastActive && (
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Last active: {member.lastActive.toLocaleDateString()}
                    </span>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Settings className="w-4 h-4 mr-2" />
                        Edit Role
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend Invitation
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-400"
                        onClick={() => handleStatusChange(member.id, 
                          member.status === 'disabled' ? 'active' : 'disabled'
                        )}
                      >
                        <UserX className="w-4 h-4 mr-2" />
                        {member.status === 'disabled' ? 'Enable Account' : 'Disable Account'}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {team.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium dark:text-white mb-2">
              No Team Members
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Start by inviting your first team member
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};