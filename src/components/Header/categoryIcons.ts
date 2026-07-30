import {
  Croissant,
  Apple,
  Fish,
  Milk,
  Shirt,
  Gift,
  Wine,
  Dog,
  Carrot,
  HelpCircle,
} from "lucide-react";

export const categoryIconMap: Record<string, React.ElementType> = {
  "baking-material": Croissant,
  "bread-and-juice": Croissant,
  "clothing-beauty": Shirt,
  "deals-of-the-day": Gift,
  "fresh-fruit": Apple,
  "fresh-seafood": Fish,
  "milks-and-dairies": Milk,
  "pet-foods-toy": Dog,
  vegetables: Carrot,
  "wines-drinks": Wine,
  uncategorized: HelpCircle,
};
