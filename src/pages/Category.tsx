import { useParams, Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { categories, services } from "@/data/services";
import ServiceCard from "@/components/ServiceCard";

const filters = [
  { key: "hasFreePlan", label: "무료 플랜 있음" },
  { key: "teamSupport", label: "팀 협업용" },
  { key: "openSource", label: "오픈소스" },
  { key: "koreanSupport", label: "한국어 지원" },
] as const;

export default function Category() {
  const { categoryId } = useParams();
  const [search, setSearch] = useState("");
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const currentCategory = categories.find((c) => c.id === categoryId);

  const filtered = useMemo(() => {
    let list = categoryId ? services.filter((s) => s.category === categoryId) : services;

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    activeFilters.forEach((f) => {
      list = list.filter((s) => (s as any)[f]);
    });

    return list;
  }, [categoryId, search, activeFilters]);

  const toggleFilter = (key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link to="/" className="hover:text-foreground">홈</Link>
          <span>/</span>
          <span>{currentCategory?.label || "전체"}</span>
        </div>
        <h1 className="text-3xl font-bold">
          {currentCategory ? `${currentCategory.icon} ${currentCategory.label}` : "전체 서비스"}
        </h1>
        {currentCategory && (
          <p className="text-muted-foreground mt-1">{currentCategory.description}</p>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          to="/category/all"
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            !categoryId || categoryId === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          전체
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoryId === cat.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.icon} {cat.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="lg:w-60 shrink-0">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="서비스 검색..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">필터</h3>
            {filters.map((f) => (
              <label key={f.key} className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  checked={activeFilters.has(f.key)}
                  onCheckedChange={() => toggleFilter(f.key)}
                />
                <span className="text-sm">{f.label}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Service grid */}
        <div className="flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">검색 결과가 없습니다</p>
              <p className="text-sm mt-1">다른 키워드로 검색해보세요</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
