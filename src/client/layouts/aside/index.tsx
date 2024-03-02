/* eslint-disable no-nested-ternary */
import clsx from "clsx";
import {
  ChevronRightSquare,
  Folder,
  FolderGit2,
  FolderLock,
  FolderOpen,
  FolderPen,
  Loader2,
} from "lucide-react";
import React, { Suspense } from "react";
import { Link, useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/client/components/ui/accordion";
import { Button, buttonVariants } from "@/client/components/ui/button";
import { ScrollArea } from "@/client/components/ui/scroll-area";

import { useQueryUIList } from "@/client/layouts/aside/hooks";
import { AsideUI } from "@/client/types";
import { cn } from "@/client/utils";

function UIItem({ item }: { item: AsideUI }) {
  const [location] = useLocation();

  const active = location.split("/").pop() === item.slug;

  return (
    <Link
      className={cn(
        buttonVariants({
          variant: "link",
          className: "flex gap-4 w-full justify-start",
        }),
        active ? "font-semibold hover:no-underline" : "text-muted-foreground"
      )}
      href={`/ui/${item.slug}`}
    >
      {active ? (
        <FolderPen className="size-6" />
      ) : item.published ? (
        <FolderGit2 className="size-6" />
      ) : (
        <FolderLock className="size-6" />
      )}
      <span>{item.title}</span>
    </Link>
  );
}

function UIList() {
  const [open, setOpen] = React.useState(false);
  const { data, isPending, hasNextPage, fetchNextPage } = useQueryUIList();

  return (
    <Accordion collapsible type="single">
      <AccordionItem className="border-none" value="item-1">
        <AccordionTrigger onClick={() => setOpen((prev) => !prev)}>
          <span className="flex gap-4">
            {open ? (
              <FolderOpen className="size-6" />
            ) : (
              <Folder className="size-6" />
            )}
            UI
          </span>
        </AccordionTrigger>
        <AccordionContent>
          {data.map((item) => (
            <UIItem key={item.slug} item={item} />
          ))}

          {hasNextPage && (
            <Button
              className={cn("w-full mt-4 flex items-center gap-x-2")}
              disabled={!hasNextPage || isPending}
              onClick={() => fetchNextPage()}
              size="sm"
            >
              {isPending && <Loader2 className="size-4 animate-spin" />}
              もっと表示する
            </Button>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function Aside() {
  const [open, setOpen] = React.useState(true);

  return (
    <aside
      className={clsx(
        "sticky h-full shrink-0 rounded-md border-r px-2 transition-all duration-300",
        open ? "w-64 " : "w-10"
      )}
    >
      <div className="grid justify-end">
        <Button
          onClick={() => setOpen((prev) => !prev)}
          size="icon"
          variant="ghost"
        >
          <ChevronRightSquare
            className={clsx("transition-transform", open && "rotate-180")}
          />
        </Button>
      </div>
      <ScrollArea
        className={clsx(
          "h-[calc(100dvh-8rem)] transition-opacity duration-150",
          open ? "opacity-100" : "opacity-0 "
        )}
      >
        <div className="grid h-full gap-y-8 pr-4">
          <Suspense>
            <UIList />
          </Suspense>
        </div>
      </ScrollArea>
    </aside>
  );
}
