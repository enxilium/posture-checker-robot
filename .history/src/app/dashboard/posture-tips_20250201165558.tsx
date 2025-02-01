'use client'

const postureTips = [
  {
    title: "Monitor Height",
    description: "Screen at eye level, arm's length away",
    icon: "🖥️",
    impact: "60% less neck strain",
    actionItems: [
      "Top of screen at or slightly below eye level",
      "Monitor distance: 20-28 inches from eyes",
      "Tilt screen back 10-20 degrees"
    ]
  },
  {
    title: "Chair Position",
    description: "Ergonomic sitting alignment",
    icon: "🪑",
    impact: "40% better spine support",
    actionItems: [
      "Feet flat on floor or footrest",
      "Knees at 90-degree angle",
      "Lower back supported by chair"
    ]
  },
  {
    title: "Break Timer",
    description: "Regular movement intervals",
    icon: "⏰",
    impact: "Reduces fatigue by 45%",
    actionItems: [
      "5-minute break every 30 minutes",
      "Stand and stretch exercises",
      "20-20-20 rule: Look 20ft away every 20min"
    ]
  },
  {
    title: "Shoulder Form",
    description: "Proper upper body alignment",
    icon: "💪",
    impact: "50% less upper back tension",
    actionItems: [
      "Shoulders relaxed and back",
      "Elbows close to body",
      "Wrists straight and supported"
    ]
  }
]

export function PostureTips() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {postureTips.map((tip, index) => (
        <div 
          key={index} 
          className="p-6 rounded-lg border bg-card hover:shadow-lg transition-all group"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl group-hover:scale-110 transition-transform">
              {tip.icon}
            </span>
            <h3 className="font-semibold text-lg">{tip.title}</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            {tip.description}
          </p>
          
          <div className="bg-muted p-3 rounded-md mb-4">
            <p className="text-sm font-medium text-green-500">
              Impact: {tip.impact}
            </p>
          </div>

          <ul className="space-y-2">
            {tip.actionItems.map((item, itemIndex) => (
              <li key={itemIndex} className="text-sm flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
