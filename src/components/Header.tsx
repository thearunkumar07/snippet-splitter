
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Play, Trash2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

interface HeaderProps {
  onRun: () => void;
  onClear: () => void;
  isLoading?: boolean;
}

const Header = ({ onRun, onClear, isLoading = false }: HeaderProps) => {
  return (
    <motion.header 
      className="flex justify-between items-center py-4 px-6 mb-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center gap-1.5">
        <motion.div 
          className="text-2xl font-light tracking-tight mr-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <span className="font-medium">Code</span>Lab
        </motion.div>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={onRun} 
              disabled={isLoading}
              className="px-3.5 py-2 h-9 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Play className="h-4 w-4 mr-1.5" />
              Run
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Run your code</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={onClear} 
              variant="outline" 
              className="px-3 py-2 h-9 ml-2 transition-all duration-300 ease-in-out transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Trash2 className="h-4 w-4 mr-1.5" />
              Clear
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear code editor</p>
          </TooltipContent>
        </Tooltip>
      </div>
      
      <ThemeToggle />
    </motion.header>
  );
};

export default Header;
