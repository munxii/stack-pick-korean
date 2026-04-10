import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Check, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServiceById, services } from "@/data/services";

export default function ServiceDetail() {
  const { serviceId } = useParams();
  const service = getServiceById(serviceId || "");

  if (!service) {
    return (
      <div className="container py-20 text-center">
        <p className="text-muted-foreground text-lg">서비스를 찾을 수 없습니다</p>
        <Link to="/">
          <Button variant="outline" className="mt-4">홈으로 돌아가기</Button>
        </Link>
      </div>
    );
  }

  const altServices = service.alternatives
    .map((id) => services.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="container py-8 max-w-5xl">
      <Link to={`/category/${service.category}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> {service.categoryLabel} 카테고리로
      </Link>

      {/* Header */}
      <div className="flex items-start gap-4 mb-8">
        <span className="text-5xl">{service.logo}</span>
        <div>
          <h1 className="text-3xl font-bold">{service.name}</h1>
          <p className="text-muted-foreground mt-1">{service.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {service.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
            {service.hasFreePlan && (
              <Badge className="bg-accent/10 text-accent border-0">무료 플랜</Badge>
            )}
            {service.openSource && (
              <Badge className="bg-primary/10 text-primary border-0">오픈소스</Badge>
            )}
          </div>
        </div>
      </div>

      {/* Pricing table */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">요금제 비교</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {service.plans.map((plan, i) => (
            <Card
              key={plan.name}
              className={`relative overflow-hidden ${
                i === 1 ? "ring-2 ring-primary shadow-lg" : "border-border/60"
              }`}
            >
              {i === 1 && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-xs py-1 font-medium">
                  인기
                </div>
              )}
              <CardContent className={`p-6 ${i === 1 ? "pt-8" : ""}`}>
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">
                    {plan.price !== null ? `$${plan.price}` : "무료"}
                  </span>
                  {plan.price !== null && (
                    <span className="text-muted-foreground text-sm">/월</span>
                  )}
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={i === 1 ? "default" : "outline"}
                  className="w-full mt-6"
                  size="sm"
                >
                  {plan.price === null ? "무료로 시작" : "자세히 보기"}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3 text-accent">👍 장점</h3>
            <ul className="space-y-2">
              {service.pros.map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="border-border/60">
          <CardContent className="p-6">
            <h3 className="font-semibold text-lg mb-3 text-destructive">👎 단점</h3>
            <ul className="space-y-2">
              {service.cons.map((c) => (
                <li key={c} className="flex items-start gap-2 text-sm">
                  <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  {c}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Recommended for */}
      <section className="mb-12">
        <h2 className="text-xl font-bold mb-4">추천 대상</h2>
        <div className="flex flex-wrap gap-3">
          {service.recommendedFor.map((r) => (
            <span key={r} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {r}
            </span>
          ))}
        </div>
      </section>

      {/* Alternatives */}
      {altServices.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">대체 서비스</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {altServices.map((s) =>
              s ? (
                <Link key={s.id} to={`/service/${s.id}`}>
                  <Card className="hover:shadow-md transition-shadow border-border/60">
                    <CardContent className="p-4 flex items-center gap-3">
                      <span className="text-2xl">{s.logo}</span>
                      <div>
                        <h4 className="font-semibold">{s.name}</h4>
                        <p className="text-xs text-muted-foreground">{s.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ) : null
            )}
          </div>
        </section>
      )}
    </div>
  );
}
