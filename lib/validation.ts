export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = []

  if (!email) {
    errors.push("L'email est requis")
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      errors.push("Format d'email invalide")
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = []

  if (!password) {
    errors.push("Le mot de passe est requis")
  } else {
    if (password.length < 8) {
      errors.push("Le mot de passe doit contenir au moins 8 caractères")
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins une minuscule")
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins une majuscule")
    }
    if (!/\d/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins un chiffre")
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push("Le mot de passe doit contenir au moins un caractère spécial")
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateName = (name: string): ValidationResult => {
  const errors: string[] = []

  if (!name) {
    errors.push("Le nom est requis")
  } else {
    if (name.length < 2) {
      errors.push("Le nom doit contenir au moins 2 caractères")
    }
    if (name.length > 50) {
      errors.push("Le nom ne peut pas dépasser 50 caractères")
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
      errors.push("Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets")
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validatePasswordMatch = (password: string, confirmPassword: string): ValidationResult => {
  const errors: string[] = []

  if (password !== confirmPassword) {
    errors.push("Les mots de passe ne correspondent pas")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
