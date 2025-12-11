
export const ClientConfirmationTemplate = (clientName: string, vars: { logoUrl?: string }) => {
    return `
    <h1 style="color: #d97706; font-size: 20px; margin-bottom: 20px; margin-top: 0; text-align: left;">Bonjour${clientName ? ' ' + clientName : ''},</h1>

    <p style="font-size: 15px; margin: 10px 0; color: #374151; line-height: 1.6;">
      Nous vous remercions chaleureusement pour votre demande de devis et pour l'intérêt que vous portez à <strong>Fuegos d'Azur</strong>.
    </p>

    <div class="highlight-box">
      <p style="margin: 0; color: #9a3412;">
        <strong>✅ Votre demande a bien été reçue</strong> et notre équipe la traite avec attention.
      </p>
    </div>

    <p style="font-size: 15px; margin: 15px 0; color: #374151; line-height: 1.6;">
      Nous reviendrons vers vous <strong>sous 48 heures maximum</strong> avec une proposition personnalisée, adaptée à votre événement.
    </p>

    <div style="margin: 25px 0; padding: 15px; background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; text-align: center;">
      <p style="margin-bottom: 10px; font-size: 14px; color: #4b5563;">
        En attendant, suivez-nous pour découvrir nos dernières réalisations 🔥
      </p>
      <a href="https://instagram.com/fuegosdazur" target="_blank" style="color: #d97706; font-weight: bold; text-decoration: none;">@fuegosdazur</a>
    </div>

    <div class="signature-box" style="margin-top: 30px; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td valign="middle" width="90" style="padding-right: 15px;">
            ${vars.logoUrl ? `<img src="${vars.logoUrl}" alt="Fuegos d'Azur" width="70" style="display: block; width: 70px;" />` : ''}
          </td>
          <td valign="middle" style="font-family: 'Helvetica Neue', Arial, sans-serif; font-size: 14px; color: #374151; line-height: 1.4;">
            <div style="margin-bottom: 5px;">À très bientôt,</div>
            <div style="font-weight: bold; color: #d97706; font-size: 15px;">L'équipe Fuegos d'Azur</div>
            <div style="color: #9ca3af; font-size: 12px; font-style: italic; margin-top: 5px;">Authenticité – Élégance – Feu</div>
          </td>
        </tr>
      </table>
    </div>
  `
}
