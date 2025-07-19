"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Search,
  Phone, 
  Video, 
  MoreVertical,
  Paperclip,
  Smile,
  SendHorizontal
} from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  sender: "user" | "doctor" | "system";
  content: string;
  timestamp: Date;
  read: boolean;
  type: "text" | "image" | "file" | "system";
}

interface Conversation {
  id: string;
  doctor: {
    id: string;
  name: string;
    specialty: string;
    avatar: string;
    online: boolean;
  };
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  messages: Message[];
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const conversations: Conversation[] = [
    {
      id: "1",
      doctor: {
        id: "doc1",
        name: "Dr. Sarah Johnson",
        specialty: "General Medicine",
        avatar: "/avatars/doctor1.jpg",
        online: true
      },
      lastMessage: "Your test results look good. We can discuss them at your next appointment.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 2,
      messages: [
    {
          id: "msg1",
          sender: "doctor",
          content: "Hello John, how are you feeling today?",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          read: true,
          type: "text"
    },
    {
          id: "msg2",
          sender: "user",
          content: "I'm feeling much better, thank you for asking.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          read: true,
          type: "text"
        },
    {
          id: "msg3",
          sender: "doctor",
          content: "Your test results look good. We can discuss them at your next appointment.",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          read: false,
          type: "text"
        }
      ]
    },
    {
      id: "2",
      doctor: {
        id: "doc2",
        name: "Dr. Michael Chen",
        specialty: "Cardiology",
        avatar: "/avatars/doctor2.jpg",
        online: false
      },
      lastMessage: "I've reviewed your ECG results. Everything looks normal.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24),
      unreadCount: 0,
      messages: [
    {
          id: "msg4",
          sender: "doctor",
          content: "I've reviewed your ECG results. Everything looks normal.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
          read: true,
          type: "text"
    }
      ]
    },
    {
      id: "3",
      doctor: {
        id: "doc3",
        name: "Dr. Lisa Thompson",
        specialty: "Pediatrics",
        avatar: "/avatars/doctor3.jpg",
        online: true
      },
      lastMessage: "Your child's vaccination is due next week.",
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      unreadCount: 1,
      messages: [
        {
          id: "msg5",
          sender: "system",
          content: "Your child's vaccination is due next week.",
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
          read: false,
          type: "system"
        }
      ]
    }
  ];

  const mockUser = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Patient"
  };

  const currentConversation = conversations.find(conv => conv.id === selectedConversation);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: "user",
      content: newMessage,
      timestamp: new Date(),
      read: false,
      type: "text"
    };

    // In a real app, this would be sent to the server
    console.log("Sending message:", message);
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(conv =>
    conv.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout variant="client" user={mockUser}>
      <div className="p-6 space-y-6">
        {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages</h1>
            <p className="mt-2 text-muted-foreground">
            Communicate with your healthcare providers.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="health-card border-0 shadow-sm h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Conversations</span>
                  <Badge variant="secondary">
                    {conversations.filter(c => c.unreadCount > 0).length} unread
                  </Badge>
                </CardTitle>
                  <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 health-card border-0"
                    />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[500px] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                        selectedConversation === conversation.id ? "bg-muted" : ""
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conversation.doctor.avatar} />
                            <AvatarFallback>
                              {conversation.doctor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          {conversation.doctor.online && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium truncate">{conversation.doctor.name}</h4>
                            <span className="text-xs text-muted-foreground">
                              {format(conversation.lastMessageTime, "MMM d")}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.doctor.specialty}
                          </p>
                          <p className="text-sm text-muted-foreground truncate">
                            {conversation.lastMessage}
                            </p>
                        </div>
                        
                        {conversation.unreadCount > 0 && (
                          <Badge variant="destructive" className="ml-2">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="health-card border-0 shadow-sm h-full flex flex-col">
              {currentConversation ? (
                <>
                  {/* Chat Header */}
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={currentConversation.doctor.avatar} />
                            <AvatarFallback>
                              {currentConversation.doctor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          {currentConversation.doctor.online && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{currentConversation.doctor.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {currentConversation.doctor.specialty}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Video className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
              </CardHeader>

                  {/* Messages */}
                  <CardContent className="flex-1 p-0">
                    <div className="h-full flex flex-col">
                      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        {currentConversation.messages.map((message) => (
                      <div
                        key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender === "user"
                                  ? "bg-primary text-primary-foreground"
                                  : message.sender === "system"
                                  ? "bg-muted text-muted-foreground"
                                  : "bg-muted"
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              <p className="text-xs opacity-70 mt-1">
                                {format(message.timestamp, "h:mm a")}
                              </p>
                            </div>
                          </div>
                        ))}
                          </div>

                      {/* Message Input */}
                      <div className="border-t p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Smile className="w-4 h-4" />
                          </Button>
                          <Input
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                            className="flex-1 health-card border-0"
                          />
                          <Button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            size="sm"
                          >
                            <SendHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                  </div>
                  </CardContent>
                </>
                ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">
                      Select a conversation
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Choose a conversation from the list to start messaging.
                    </p>
                  </div>
                  </div>
                )}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 