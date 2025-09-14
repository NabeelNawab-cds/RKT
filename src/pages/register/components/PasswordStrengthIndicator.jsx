import React from 'react';

const PasswordStrengthIndicator = ({ password }) => {
  const calculateStrength = (pwd) => {
    if (!pwd) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: pwd?.length >= 8,
      lowercase: /[a-z]/?.test(pwd),
      uppercase: /[A-Z]/?.test(pwd),
      numbers: /\d/?.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(pwd)
    };
    
    score = Object.values(checks)?.filter(Boolean)?.length;
    
    const strengthLevels = {
      0: { label: '', color: '' },
      1: { label: 'Very Weak', color: 'bg-error' },
      2: { label: 'Weak', color: 'bg-warning' },
      3: { label: 'Fair', color: 'bg-warning' },
      4: { label: 'Strong', color: 'bg-success' },
      5: { label: 'Very Strong', color: 'bg-success' }
    };
    
    return { score, ...strengthLevels?.[score], checks };
  };

  const strength = calculateStrength(password);

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      {/* Strength Bar */}
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5]?.map((level) => (
          <div
            key={level}
            className={`
              h-1 flex-1 rounded-full transition-all duration-300
              ${level <= strength?.score 
                ? strength?.color 
                : 'bg-surface'
              }
            `}
          />
        ))}
      </div>
      {/* Strength Label */}
      {strength?.label && (
        <div className="flex items-center justify-between">
          <span className={`
            text-xs font-medium transition-colors duration-300
            ${strength?.score <= 2 ? 'text-error' : 
              strength?.score <= 3 ? 'text-warning' : 'text-success'}
          `}>
            Password Strength: {strength?.label}
          </span>
        </div>
      )}
      {/* Requirements Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
        <div className={`
          flex items-center space-x-1 transition-colors duration-300
          ${strength?.checks?.length ? 'text-success' : 'text-text-secondary'}
        `}>
          <div className={`
            w-3 h-3 rounded-full flex items-center justify-center
            ${strength?.checks?.length ? 'bg-success' : 'bg-surface'}
          `}>
            {strength?.checks?.length && (
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
            )}
          </div>
          <span>8+ characters</span>
        </div>

        <div className={`
          flex items-center space-x-1 transition-colors duration-300
          ${strength?.checks?.uppercase ? 'text-success' : 'text-text-secondary'}
        `}>
          <div className={`
            w-3 h-3 rounded-full flex items-center justify-center
            ${strength?.checks?.uppercase ? 'bg-success' : 'bg-surface'}
          `}>
            {strength?.checks?.uppercase && (
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
            )}
          </div>
          <span>Uppercase letter</span>
        </div>

        <div className={`
          flex items-center space-x-1 transition-colors duration-300
          ${strength?.checks?.numbers ? 'text-success' : 'text-text-secondary'}
        `}>
          <div className={`
            w-3 h-3 rounded-full flex items-center justify-center
            ${strength?.checks?.numbers ? 'bg-success' : 'bg-surface'}
          `}>
            {strength?.checks?.numbers && (
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
            )}
          </div>
          <span>Number</span>
        </div>

        <div className={`
          flex items-center space-x-1 transition-colors duration-300
          ${strength?.checks?.special ? 'text-success' : 'text-text-secondary'}
        `}>
          <div className={`
            w-3 h-3 rounded-full flex items-center justify-center
            ${strength?.checks?.special ? 'bg-success' : 'bg-surface'}
          `}>
            {strength?.checks?.special && (
              <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
            )}
          </div>
          <span>Special character</span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;