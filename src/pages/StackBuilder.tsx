import { useState } from "react";
import { Plus, X, TrendingDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services, type Service, type Plan } from "@/data/services";

interface StackItem {
  serviceId: string;
  planIndex: number;
}

export default function StackBuilder() {
  const [stack, setStack] = useState<StackItem[]>([]);
  const [showPicker, setShowPicker] = useState(false);
  const [showSavings, setShowSavings] = useState(false);

  const addService = (serviceId: string) => {
    if (!stack.find((s) => s.serviceId === serviceId)) {
      setStack([...stack, { serviceId, planIndex: 0 }]);
    }
    setShowPicker(false);
  };

  const removeService = (serviceId: string) => {
    setStack(stack.filter((s) => s.serviceId !== serviceId));
    setShowSavings(false);
  };

  const changePlan = (serviceId: string, planIndex: number) => {
    setStack(stack.map((s) => (s.serviceId === serviceId ? { ...s, planIndex } : s)));
    setShowSavings(false);
  };

  const getService = (id: string) => services.find((s) => s.id === id)!;

  const totalCost = stack.reduce((sum, item) => {
    const service = getService(item.serviceId);
    const plan = service.plans[item.planIndex];
    return sum + (plan.price || 0);
  }, 0);

  const freeCost = stack.reduce((sum, item) => {
    const service = getService(item.serviceId);
    return sum + (service.plans[0].price || 0);
  }, 0);

  const savings = totalCost - freeCost;

  const available = services.filter((s) => !stack.find((si) => si.serviceId === s.id));

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">⚡ 스택 빌더</h1>
        <p className="text-muted-foreground mt-1">
          서비스와 플랜을 조합하고 월 총비용을 확인하세요
        </p>
      </div>

      {/* Stack items */}
      <div className="space-y-4 mb-6">
        {stack.map((item) => {
          const service = getService(item.serviceId);
          const currentPlan = service.plans[item.planIndex];
          return (
            <Card key={item.serviceId} className="border-border/60">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.logo}</span>
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-xs text-muted-foreground">{service.categoryLabel}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeService(item.serviceId)}
                    className="text-muted-foreground hover:text-destructive p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {service.plans.map((plan, i) => (
                    <button
                      key={plan.name}
                      onClick={() => changePlan(item.serviceId, i)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        i === item.planIndex
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {plan.name}
                      <span className="ml-2 opacity-75">{plan.priceLabel}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Add button */}
      <div className="relative mb-8">
        <Button
          variant="outline"
          onClick={() => setShowPicker(!showPicker)}
          className="w-full border-dashed gap-2"
          disabled={available.length === 0}
        >
          <Plus className="h-4 w-4" /> 서비스 추가
        </Button>
        {showPicker && (
          <div className="absolute z-10 top-full mt-2 left-0 right-0 bg-card border rounded-lg shadow-lg p-2 max-h-64 overflow-y-auto">
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

      {/* Total cost */}
      {stack.length > 0 && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">월 총비용</p>
                <p className="text-4xl font-bold text-primary">
                  ${totalCost}<span className="text-lg font-normal text-muted-foreground">/월</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{stack.length}개 서비스</p>
              </div>
            </div>

            <Button
              onClick={() => setShowSavings(true)}
              className="w-full gap-2"
              variant="outline"
            >
              <TrendingDown className="h-4 w-4" />
              더 저렴한 조합 찾기
            </Button>

            {showSavings && (
              <div className="mt-4 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  <span className="font-semibold text-accent">절감 가능 금액</span>
                </div>
                {savings > 0 ? (
                  <p className="text-sm">
                    모든 서비스를 무료 플랜으로 전환하면{" "}
                    <strong className="text-accent">${savings}/월</strong>을 절감할 수 있습니다.
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    이미 최저 비용 조합입니다! 🎉
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {stack.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">스택이 비어있습니다</p>
          <p className="text-sm mt-1">위의 "서비스 추가" 버튼으로 시작하세요</p>
        </div>
      )}
    </div>
  );
}
