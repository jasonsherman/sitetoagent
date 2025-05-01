import { createContext, useContext, useState } from 'react';

type TabsContextType = {
  value: string;
  onValueChange: (value: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const Tabs = ({ 
  children, 
  value, 
  onValueChange,
  defaultValue,
}: { 
  children: React.ReactNode; 
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) => {
  const [tabValue, setTabValue] = useState(value || defaultValue || '');
  
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setTabValue(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ 
      value: value !== undefined ? value : tabValue, 
      onValueChange: handleValueChange 
    }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

export const TabsList = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 text-gray-600 mb-4">
      {children}
    </div>
  );
};

export const TabsTrigger = ({ 
  children, 
  value,
  disabled
}: { 
  children: React.ReactNode; 
  value: string;
  disabled?: boolean;
}) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsTrigger must be used within a Tabs component');
  }
  
  const isActive = context.value === value;
  
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? 'bg-white text-indigo-700 shadow-sm'
          : 'text-gray-600 hover:text-gray-900'
      }`}
      onClick={() => context.onValueChange(value)}
    >
      {children}
    </button>
  );
};

export const TabsContent = ({ 
  children, 
  value 
}: { 
  children: React.ReactNode; 
  value: string;
}) => {
  const context = useContext(TabsContext);
  
  if (!context) {
    throw new Error('TabsContent must be used within a Tabs component');
  }
  
  return context.value === value ? <div>{children}</div> : null;
};