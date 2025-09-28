import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Globe, MessageSquare, TrendingUp, Search, Filter, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { User, Website, ContactMessage } from "@/types";

export function AdminPanel() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("all");
  const [websiteFilter, setWebsiteFilter] = useState("all");

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/users");
      return response.json();
    }
  });

  const { data: websites = [], isLoading: websitesLoading } = useQuery({
    queryKey: ["/api/admin/websites"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/websites");
      return response.json();
    }
  });

  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["/api/admin/messages"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/admin/messages");
      return response.json();
    }
  });

  const filteredUsers = users.filter((user: User) => {
    const matchesSearch = user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = userFilter === "all" || 
                         (userFilter === "verified" && user.emailVerified) ||
                         (userFilter === "unverified" && !user.emailVerified);
    
    return matchesSearch && matchesFilter;
  });

  const filteredWebsites = websites.filter((website: Website) => {
    const matchesSearch = website.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         website.businessName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = websiteFilter === "all" || website.template === websiteFilter;
    
    return matchesSearch && matchesFilter;
  });

  const filteredMessages = messages.filter((message: ContactMessage) => {
    return message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
           message.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           message.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
           message.subject.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const stats = [
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      title: "Websites Created",
      value: websites.length,
      icon: Globe,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      title: "Contact Messages",
      value: messages.length,
      icon: MessageSquare,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      title: "Verified Users",
      value: users.filter((u: User) => u.emailVerified).length,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100"
    }
  ];

  const exportData = (data: any[], filename: string) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const convertToCSV = (data: any[]) => {
    if (data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => `"${row[header] || ''}"`).join(','))
    ].join('\n');
    
    return csvContent;
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, websites, and monitor system performance</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search and Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users, websites, or messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={userFilter} onValueChange={setUserFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter users" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="unverified">Unverified</SelectItem>
              </SelectContent>
            </Select>
            <Select value={websiteFilter} onValueChange={setWebsiteFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter websites" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Templates</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="minimalist">Minimalist</SelectItem>
                <SelectItem value="crypto">Crypto</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="chat">Chat</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage registered users and their information</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportData(filteredUsers, 'users.csv')}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {usersLoading ? (
            <div className="text-center py-8">Loading users...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">
                      {user.firstName} {user.lastName}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant={user.emailVerified ? "default" : "secondary"}>
                        {user.emailVerified ? "Verified" : "Unverified"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(user.createdAt!).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Websites Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Generated Websites</CardTitle>
              <CardDescription>View all websites created by users</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportData(filteredWebsites, 'websites.csv')}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {websitesLoading ? (
            <div className="text-center py-8">Loading websites...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Website Name</TableHead>
                  <TableHead>Business Name</TableHead>
                  <TableHead>Template</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWebsites.map((website: Website) => (
                  <TableRow key={website.id}>
                    <TableCell className="font-medium">{website.name}</TableCell>
                    <TableCell>{website.businessName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {website.template}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(website.createdAt!).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {website.previewUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(website.previewUrl!, '_blank')}
                        >
                          View
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Contact Messages Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contact Messages</CardTitle>
              <CardDescription>Messages from website visitors</CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => exportData(filteredMessages, 'messages.csv')}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {messagesLoading ? (
            <div className="text-center py-8">Loading messages...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMessages.map((message: ContactMessage) => (
                  <TableRow key={message.id}>
                    <TableCell className="font-medium">
                      {message.firstName} {message.lastName}
                    </TableCell>
                    <TableCell>{message.email}</TableCell>
                    <TableCell>{message.subject}</TableCell>
                    <TableCell>
                      {new Date(message.createdAt!).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {message.message}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
