import React, { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const register = useAuthStore((s) => s.register);
  const error = useAuthStore((s) => s.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("guest");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Пароли не совпадают");
      return;
    }
    setLoading(true);
    await register(email, password, role);
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-tr from-blue-50 to-blue-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Регистрация</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <Label htmlFor="email">Электронная почта</Label>
              <Input
                id="email"
                type="email"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Подтвердите пароль"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="role">Роль</Label>
              <Select value={role} onValueChange={(value) => setRole(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите роль" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="guest">Гость</SelectItem>
                  <SelectItem value="expert">Эксперт</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

            <Button type="submit" className="w-full mt-2" disabled={loading}>
              {loading ? "Регистрация..." : "Зарегистрироваться"}
            </Button>
          </form>

          <Separator className="my-4" />

          <p className="text-center text-sm text-gray-500">
            Уже есть аккаунт?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Войти
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
