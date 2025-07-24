"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Stethoscope, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit,
  Calendar,
  User,
  CheckCircle,
  Clock,
  FileText,
  Tag
} from "lucide-react";

interface ClinicalNote {
  id: number;
  patientName: string;
  patientId: string;
  category: string;
  date: string;
  time: string;
  status: string;
  doctor: string;
  department: string;
  title: string;
  content: string;
  tags: string[];
}

export default function NotesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  // const [selectedNote, setSelectedNote] = useState<ClinicalNote | null>(null);
  // const [isEditing, setIsEditing] = useState(false);

  // Mock clinical notes data
  const notes = [
    {
      id: 1,
      patientName: "Sarah Johnson",
      patientId: "P001",
      category: "Progress Note",
      date: "2024-02-20",
      time: "09:30 AM",
      status: "completed",
      doctor: "Dr. Smith",
      department: "Cardiology",
      title: "Follow-up consultation",
      content: "Patient reports improved energy levels and reduced chest pain. Blood pressure readings show improvement. Continue current medication regimen. Schedule follow-up in 2 weeks.",
      tags: ["follow-up", "cardiology", "improvement"]
    },
    {
      id: 2,
      patientName: "Michael Chen",
      patientId: "P002",
      category: "Assessment",
      date: "2024-02-20",
      time: "10:45 AM",
      status: "draft",
      doctor: "Dr. Johnson",
      department: "Neurology",
      title: "Initial neurological assessment",
      content: "Patient presents with persistent headaches for the past 3 weeks. No history of head trauma. Neurological examination reveals normal cranial nerves. Recommend MRI scan for further evaluation.",
      tags: ["assessment", "neurology", "headache"]
    },
    {
      id: 3,
      patientName: "Emily Davis",
      patientId: "P003",
      category: "Surgery Note",
      date: "2024-02-19",
      time: "02:15 PM",
      status: "completed",
      doctor: "Dr. Wilson",
      department: "Orthopedics",
      title: "Post-operative evaluation",
      content: "Patient recovering well from knee replacement surgery. Incision site healing properly. Range of motion improving. Physical therapy progressing as expected. Pain management adequate.",
      tags: ["surgery", "orthopedics", "recovery"]
    },
    {
      id: 4,
      patientName: "Robert Wilson",
      patientId: "P004",
      category: "Treatment Plan",
      date: "2024-02-19",
      time: "11:20 AM",
      status: "completed",
      doctor: "Dr. Brown",
      department: "Oncology",
      title: "Chemotherapy treatment plan",
      content: "Patient diagnosed with stage II lung cancer. Treatment plan includes 6 cycles of chemotherapy. First cycle scheduled for next week. Side effects discussed and management plan provided.",
      tags: ["treatment", "oncology", "chemotherapy"]
    },
    {
      id: 5,
      patientName: "Lisa Anderson",
      patientId: "P005",
      category: "Discharge Summary",
      date: "2024-02-18",
      time: "03:30 PM",
      status: "completed",
      doctor: "Dr. Davis",
      department: "Pediatrics",
      title: "Discharge summary - appendicitis",
      content: "Patient admitted with acute appendicitis. Laparoscopic appendectomy performed successfully. Post-operative course uneventful. Discharged with instructions for wound care and follow-up.",
      tags: ["discharge", "pediatrics", "surgery"]
    }
  ];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || note.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Progress Note': 'bg-blue-100 text-blue-800',
      'Assessment': 'bg-green-100 text-green-800',
      'Surgery Note': 'bg-purple-100 text-purple-800',
      'Treatment Plan': 'bg-orange-100 text-orange-800',
      'Discharge Summary': 'bg-red-100 text-red-800',
      'Consultation': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Clinical Notes</h1>
          <p className="text-muted-foreground">
            Manage patient clinical notes and documentation
          </p>
        </div>
        <Button className="health-btn-primary">
          <Plus className="w-4 h-4 mr-2" />
          New Note
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="health-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Notes</p>
                <p className="text-2xl font-bold text-foreground">{notes.length}</p>
              </div>
              <Stethoscope className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-foreground">
                  {notes.filter(n => n.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Drafts</p>
                <p className="text-2xl font-bold text-foreground">
                  {notes.filter(n => n.status === 'draft').length}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="health-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today&apos;s Notes</p>
                <p className="text-2xl font-bold text-foreground">
                  {notes.filter(n => n.date === new Date().toISOString().split('T')[0]).length}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="health-card">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search notes by patient name or title..."
                  className="pl-10 health-card border-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48 health-card border-0">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Progress Note">Progress Note</SelectItem>
                <SelectItem value="Assessment">Assessment</SelectItem>
                <SelectItem value="Surgery Note">Surgery Note</SelectItem>
                <SelectItem value="Treatment Plan">Treatment Plan</SelectItem>
                <SelectItem value="Discharge Summary">Discharge Summary</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="health-btn-secondary">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <Card className="health-card">
        <CardHeader>
          <CardTitle>Clinical Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-lg bg-muted">
                    <Stethoscope className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{note.title}</h3>
                    <p className="text-sm text-muted-foreground">{note.patientName} (ID: {note.patientId})</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(note.status)}>
                        {note.status}
                      </Badge>
                      <Badge className={getCategoryColor(note.category)}>
                        {note.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span>{note.doctor}</span>
                      <span>{note.department}</span>
                      <span>{new Date(note.date).toLocaleDateString()} at {note.time}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Clinical Note - {note.title}</DialogTitle>
                      </DialogHeader>
                      <Tabs defaultValue="content" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="content">Content</TabsTrigger>
                          <TabsTrigger value="patient">Patient</TabsTrigger>
                          <TabsTrigger value="metadata">Metadata</TabsTrigger>
                        </TabsList>
                        <TabsContent value="content" className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Note Content</h4>
                            <div className="bg-muted/50 rounded-lg p-4">
                              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                {note.content}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Tags</h4>
                            <div className="flex flex-wrap gap-2">
                              {note.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary">
                                  <Tag className="w-3 h-3 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="patient" className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">Patient Information</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-muted-foreground" />
                                <span>{note.patientName}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="w-4 h-4 text-muted-foreground" />
                                <span>Patient ID: {note.patientId}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Stethoscope className="w-4 h-4 text-muted-foreground" />
                                <span>Department: {note.department}</span>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                        <TabsContent value="metadata" className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="font-medium mb-2">Note Details</h4>
                              <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4 text-muted-foreground" />
                                  <span>{new Date(note.date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-muted-foreground" />
                                  <span>{note.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4 text-muted-foreground" />
                                  <span>{note.doctor}</span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Status & Category</h4>
                              <div className="space-y-2">
                                <Badge className={getStatusColor(note.status)}>
                                  {note.status}
                                </Badge>
                                <Badge className={getCategoryColor(note.category)}>
                                  {note.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </DialogContent>
                  </Dialog>
                  <Button variant="ghost" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 