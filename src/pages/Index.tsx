import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { categories, services, popularCombos, getServiceById } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";

export default function Index() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container py-20 md:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            SaaS 비용, 똑똑하게 비교하세요
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
            내 프로젝트에 딱 맞는
            <br />
            <span className="text-primary">SaaS 조합</span>을 찾아보세요
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            요금제를 한눈에 비교하고, 최적의 스택을 빌드하고, 비용을 절감하세요.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/stack-builder">
              <Button size="lg" className="gap-2 text-base px-8">
                스택 빌더 시작 <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/category/ai">
              <Button variant="outline" size="lg" className="text-base px-8">
                서비스 둘러보기
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-16">
        <h2 className="text-2xl font-bold mb-8">카테고리</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.id}`}>
              <Card className="hover:shadow-md hover:-translate-y-1 transition-all duration-200 cursor-pointer h-full border-border/60">
                <CardContent className="p-5 text-center">
                  <span className="text-3xl block mb-2">{cat.icon}</span>
                  <h3 className="font-semibold text-sm">{cat.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{cat.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Services */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">인기 서비스</h2>
          <Link to="/category/ai" className="text-sm text-primary hover:underline flex items-center gap-1">
            전체 보기 <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.slice(0, 8).map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </section>

      {/* Popular Combos */}
      <section className="container py-16">
        <h2 className="text-2xl font-bold mb-8">인기 비교 조합</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {popularCombos.map((combo) => (
            <Card key={combo.title} className="hover:shadow-md transition-shadow border-border/60">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">{combo.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {combo.services.map((sid) => {
                    const s = getServiceById(sid);
                    return s ? (
                      <span
                        key={sid}
                        className="inline-flex items-center gap-1 text-sm bg-secondary px-3 py-1 rounded-full"
                      >
                        {s.logo} {s.name}
                      </span>
                    ) : null;
                  })}
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {combo.totalFree ? "무료 플랜 가능" : "유료 플랜 기준"}
                  </span>
                  <span className="font-semibold text-primary">{combo.totalPaid}</span>
                </div>
                <Link to="/stack-builder" className="block mt-4">
                  <Button variant="outline" size="sm" className="w-full">이 조합으로 시작</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50">
        <div className="container py-8 text-center text-sm text-muted-foreground">
          <p>© 2026 StackPick. 내 프로젝트에 딱 맞는 SaaS 조합을 찾아보세요.</p>
        </div>
      </footer>
    </div>
  );
}
