import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, type Service } from "@/data/services";

export default function Compare() {
  const [selected, setSelected] = useState<string[]>([]);
  const [showPicker, setShowPicker] = useState(false);

  const selectedServices = selected
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean) as Service[];

  const addService = (id: string) => {
    if (selected.length < 5 && !selected.includes(id)) {
      setSelected([...selected, id]);
    }
    setShowPicker(false);
  };

  const removeService = (id: string) => {
    setSelected(selected.filter((s) => s !== id));
  };

  const available = services.filter((s) => !selected.includes(s.id));

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">서비스 비교</h1>
      <p className="text-muted-foreground mb-8">최대 5개 서비스를 나란히 비교하세요</p>

      {/* Service selector */}
      <div className="flex flex-wrap gap-2 mb-8">
        {selectedServices.map((s) => (
          <span
            key={s.id}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
          >
            {s.logo} {s.name}
            <button onClick={() => removeService(s.id)} className="hover:text-destructive">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
        {selected.length < 5 && (
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPicker(!showPicker)}
              className="rounded-full gap-1"
            >
              <Plus className="h-3 w-3" /> 서비스 추가
            </Button>
            {showPicker && (
              <div className="absolute z-10 top-full mt-2 left-0 w-64 bg-card border rounded-lg shadow-lg p-2 max-h-64 overflow-y-auto">
                {available.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => addService(s.id)}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-secondary flex items-center gap-2 text-sm"
                  >
                    {s.logo} {s.name}
                    <span className="text-xs text-muted-foreground ml-auto">{s.categoryLabel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedServices.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">비교할 서비스를 추가해주세요</p>
          <p className="text-sm mt-1">위의 "서비스 추가" 버튼을 클릭하세요</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-semibold w-40">항목</th>
                {selectedServices.map((s) => (
                  <th key={s.id} className="text-center p-3 font-semibold min-w-[180px]">
                    <span className="text-xl block mb-1">{s.logo}</span>
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-3 font-medium">카테고리</td>
                {selectedServices.map((s) => (
                  <td key={s.id} className="p-3 text-center">{s.categoryLabel}</td>
                ))}
              </tr>
              <tr className="border-b bg-secondary/30">
                <td className="p-3 font-medium">무료 플랜</td>
                {selectedServices.map((s) => (
                  <td key={s.id} className="p-3 text-center">
                    {s.hasFreePlan ? (
                      <Badge className="bg-accent/10 text-accent border-0">있음</Badge>
                    ) : (
                      <Badge variant="secondary">없음</Badge>
                    )}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">시작 가격</td>
                {selectedServices.map((s) => {
                  const paid = s.plans.find((p) => p.price !== null);
                  return (
                    <td key={s.id} className="p-3 text-center font-semibold">
                      {paid ? paid.priceLabel : "무료"}
                    </td>
                  );
                })}
              </tr>
              <tr className="border-b bg-secondary/30">
                <td className="p-3 font-medium">팀 플랜</td>
                {selectedServices.map((s) => (
                  <td key={s.id} className="p-3 text-center">
                    {s.teamSupport ? "✅" : "❌"}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium">한국어 지원</td>
                {selectedServices.map((s) => (
                  <td key={s.id} className="p-3 text-center">
                    {s.koreanSupport ? "✅" : "❌"}
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-secondary/30">
                <td className="p-3 font-medium">오픈소스</td>
                {selectedServices.map((s) => (
                  <td key={s.id} className="p-3 text-center">
                    {s.openSource ? "✅" : "❌"}
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="p-3 font-medium align-top">주요 기능</td>
                {selectedServices.map((s) => {
                  const bestPlan = s.plans[s.plans.length - 1];
                  return (
                    <td key={s.id} className="p-3">
                      <ul className="space-y-1 text-xs">
                        {bestPlan.features.map((f) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>
                    </td>
                  );
                })}
              </tr>
              <tr>
                <td className="p-3 font-medium align-top">장점</td>
                {selectedServices.map((s) => (
                  <td key={s.id} className="p-3">
                    <ul className="space-y-1 text-xs text-accent">
                      {s.pros.map((p) => (
                        <li key={p}>✓ {p}</li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
