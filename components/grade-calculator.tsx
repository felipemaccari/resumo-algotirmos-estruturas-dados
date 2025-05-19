"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GradeCalculator() {
  // Estados para as notas do primeiro bimestre
  const [lista1, setLista1] = useState<string>("");
  const [aps1, setAps1] = useState<string>("");
  const [prova1, setProva1] = useState<string>("");
  const [mediaBimestre1, setMediaBimestre1] = useState<number>(0);

  // Estados para as notas do segundo bimestre
  const [lista2, setLista2] = useState<string>("");
  const [lista3, setLista3] = useState<string>("");
  const [aps2, setAps2] = useState<string>("");
  const [prova2, setProva2] = useState<string>("");
  const [mediaBimestre2, setMediaBimestre2] = useState<number>(0);

  // Estado para a média final
  const [mediaFinal, setMediaFinal] = useState<number>(0);

  // Função para calcular a média do primeiro bimestre
  useEffect(() => {
    const lista1Num = parseFloat(lista1) || 0;
    const aps1Num = parseFloat(aps1) || 0;
    const prova1Num = parseFloat(prova1) || 0;

    const media = lista1Num * 0.2 + aps1Num * 0.4 + prova1Num * 0.4;
    setMediaBimestre1(media);
  }, [lista1, aps1, prova1]);

  // Função para calcular a média do segundo bimestre
  useEffect(() => {
    const lista2Num = parseFloat(lista2) || 0;
    const lista3Num = parseFloat(lista3) || 0;
    const aps2Num = parseFloat(aps2) || 0;
    const prova2Num = parseFloat(prova2) || 0;

    const media =
      lista2Num * 0.1 + lista3Num * 0.1 + aps2Num * 0.2 + prova2Num * 0.6;
    setMediaBimestre2(media);
  }, [lista2, lista3, aps2, prova2]);

  // Função para calcular a média final
  useEffect(() => {
    const media = (mediaBimestre1 + mediaBimestre2) / 2;
    setMediaFinal(media);
  }, [mediaBimestre1, mediaBimestre2]);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Primeiro Bimestre</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lista1">Lista 01 (20%)</Label>
              <Input
                id="lista1"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={lista1}
                onChange={(e) => setLista1(e.target.value)}
                placeholder="Digite a nota"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aps1">APS 01 (40%)</Label>
              <Input
                id="aps1"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={aps1}
                onChange={(e) => setAps1(e.target.value)}
                placeholder="Digite a nota"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prova1">Prova 01 (40%)</Label>
              <Input
                id="prova1"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={prova1}
                onChange={(e) => setProva1(e.target.value)}
                placeholder="Digite a nota"
              />
            </div>
            <div className="space-y-2">
              <Label>Média do Bimestre</Label>
              <div className="text-2xl font-bold">
                {mediaBimestre1.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segundo Bimestre</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="lista2">Lista 02 (10%)</Label>
              <Input
                id="lista2"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={lista2}
                onChange={(e) => setLista2(e.target.value)}
                placeholder="Digite a nota"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lista3">Lista 03 (10%)</Label>
              <Input
                id="lista3"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={lista3}
                onChange={(e) => setLista3(e.target.value)}
                placeholder="Digite a nota"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="aps2">APS 02 (20%)</Label>
              <Input
                id="aps2"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={aps2}
                onChange={(e) => setAps2(e.target.value)}
                placeholder="Digite a nota"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="prova2">Prova 02 (60%)</Label>
              <Input
                id="prova2"
                type="number"
                min="0"
                max="10"
                step="0.1"
                value={prova2}
                onChange={(e) => setProva2(e.target.value)}
                placeholder="Digite a nota"
              />
            </div>
            <div className="space-y-2">
              <Label>Média do Bimestre</Label>
              <div className="text-2xl font-bold">
                {mediaBimestre2.toFixed(2)}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Média Final</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-center">
            {mediaFinal.toFixed(2)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
