import React from "react";
import { Calendar, Home, Inbox, Search, Settings, LogOut } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Навигационные пункты
const items = [
  { title: "Главная", url: "/", icon: Home },
  { title: "Входящие", url: "/inbox", icon: Inbox },
  { title: "Календарь", url: "/calendar", icon: Calendar },
  { title: "Поиск", url: "/search", icon: Search },
  { title: "Настройки", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { user, logout } = useAuthStore();
  console.log(user);
  return (
    <Sidebar
      className="h-screen flex flex-col justify-between"
      collapsible="icon"
    >
      <SidebarContent>
        {/* Навигационное меню */}
        <SidebarGroup>
          <SidebarGroupLabel>Меню</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Блок пользователя и кнопка logout */}
      <div className="p-4 border-t border-gray-200">
        {user && (
          <div className="mb-4">
            <p className="text-sm font-medium">{user.email}</p>
            <p className="text-xs text-gray-500">{user.role}</p>
          </div>
        )}
        <Button
          variant="outline"
          size="sm"
          className="w-full flex items-center justify-center gap-2"
          onClick={() => logout()}
        >
          <LogOut className="w-4 h-4" /> Выйти
        </Button>
      </div>
    </Sidebar>
  );
}
