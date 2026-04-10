import { Link } from "react-router-dom";
import type { Service } from "@/data/services";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  service: Service;
  onCompare?: (id: string) => void;
  comparing?: boolean;
}

export default function ServiceCard({ service, onCompare, comparing }: Props) {
  const startPrice = service.plans.find((p) => p.price !== null);

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border-border/60">
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{service.logo}</span>
            <div>
              <Link
                to={`/service/${service.id}`}
                className="font-semibold text-foreground hover:text-primary transition-colors"
              >
                {service.name}
              </Link>
              <p className="text-xs text-muted-foreground">{service.categoryLabel}</p>
            </div>
          </div>
          {service.hasFreePlan && (
            <Badge variant="secondary" className="bg-accent/10 text-accent border-0 text-xs">
              무료
            </Badge>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{service.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-border/40">
          <span className="text-sm font-medium">
            {startPrice ? `${startPrice.priceLabel}부터` : "무료 시작"}
          </span>
          {onCompare && (
            <button
              onClick={() => onCompare(service.id)}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                comparing
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
            >
              {comparing ? "비교 중" : "+ 비교"}
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
