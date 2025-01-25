import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import {
  IconDotsVertical,
  IconEdit,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto p-4",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  thumbnail,
  icon,
  options,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  thumbnail?: { url: string };
  icon?: React.ReactNode;
  options: boolean;
}) => {
  return (
    <div
      className={cn(
        "rounded-lg overflow-hidden group hover:shadow-md transition-shadow bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700",
        className
      )}
    >
      {/* Thumbnail */}
      <div className="relative w-full bg-gray-100 dark:bg-gray-800 aspect-video">
        {thumbnail?.url ? (
          <img
            src={thumbnail.url}
            alt={title?.toString() || "Thumbnail"}
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400 text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-row justify-between">
        {/* Icon */}
        <div className="flex flex-row gap-3">
          {icon && (
            <div className="text-primary-600 dark:text-primary-400 text-xl flex-shrink-0 mt-1">
              {icon}
            </div>
          )}

          {/* Text Content */}
          <div className="">
            <h3 className="font-semibold text-sm text-gray-800 dark:text-gray-100 line-clamp-2 text-left">
              {title}
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-1 text-left">
              {description}
            </p>
          </div>
        </div>

        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild style={{ cursor: "pointer" }}>
              <div className="">
                <IconDotsVertical className="h-4 w-4 text-neutral-500" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Choose One</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="flex flex-row align-center">
                  <IconEye />
                  Preview
                </DropdownMenuItem>
                {options && (
                  <DropdownMenuItem className="flex flex-row align-center">
                    <IconEdit />
                    Edit
                  </DropdownMenuItem>
                )}
                {options && (
                  <DropdownMenuItem className="flex flex-row align-center">
                    <IconTrash />
                    Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
