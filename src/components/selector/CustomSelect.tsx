import React from "react";
import { selectorContentType } from "../../types/components/SelectorTypes";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CutomSelect: React.FC<{ selectorContent: selectorContentType }> = ({ selectorContent }) => {
  const { title = "", items = [] } = selectorContent?.selectorContent;

  return (
    <div className="grid gap-3">
      <Label htmlFor={title?.toLowerCase()}>{title}</Label>
      <Select>
        <SelectTrigger id={title?.toLowerCase()} aria-label="Select status">
          <SelectValue placeholder={`Select ${title?.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {items?.map((item, i) => (
            <SelectItem value={item.value} key={i}>
              {item?.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CutomSelect;
